from __future__ import annotations

from collections import Counter
from dataclasses import dataclass, field
from itertools import combinations
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
BASE = SCRIPT_DIR / "BaseStreamingNominalApenasTrue.arff"
MIN_SUPPORT = 0.20
MIN_CONFIDENCE = 0.80


def load_arff_transactions(path: Path) -> tuple[list[str], list[frozenset[str]]]:
    attributes: list[str] = []
    transactions: list[frozenset[str]] = []
    in_data = False

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("%"):
            continue

        lower = line.lower()
        if lower.startswith("@attribute"):
            attributes.append(line.split()[1])
        elif lower.startswith("@data"):
            in_data = True
        elif in_data:
            values = [value.strip() for value in line.split(",")]
            transactions.append(
                frozenset(attribute for attribute, value in zip(attributes, values) if value == "t")
            )

    return attributes, transactions


def support_count(transactions: list[frozenset[str]], itemset: frozenset[str]) -> int:
    return sum(1 for transaction in transactions if itemset <= transaction)


def apriori(transactions: list[frozenset[str]], min_support: float) -> dict[frozenset[str], int]:
    total = len(transactions)
    min_count = int(total * min_support + 0.999999)
    single_counts = Counter(item for transaction in transactions for item in transaction)
    frequent = {frozenset([item]): count for item, count in single_counts.items() if count >= min_count}
    all_frequent = dict(frequent)

    size = 2
    previous = set(frequent)
    while previous:
        candidates: set[frozenset[str]] = set()
        previous_list = list(previous)
        for left, right in combinations(previous_list, 2):
            candidate = left | right
            if len(candidate) == size and all(
                frozenset(subset) in previous for subset in combinations(candidate, size - 1)
            ):
                candidates.add(candidate)

        counts: Counter[frozenset[str]] = Counter()
        for transaction in transactions:
            for candidate in candidates:
                if candidate <= transaction:
                    counts[candidate] += 1

        current = {itemset: count for itemset, count in counts.items() if count >= min_count}
        all_frequent.update(current)
        previous = set(current)
        size += 1

    return all_frequent


@dataclass
class FPNode:
    item: str | None
    count: int
    parent: "FPNode | None"
    children: dict[str, "FPNode"] = field(default_factory=dict)
    link: "FPNode | None" = None


def build_fp_tree(
    transactions: list[list[str]],
    min_count: int,
) -> tuple[FPNode, dict[str, list[object]]]:
    item_counts = Counter(item for transaction in transactions for item in transaction)
    frequent_items = {item: count for item, count in item_counts.items() if count >= min_count}
    order = {item: index for index, item in enumerate(sorted(frequent_items, key=lambda x: (-frequent_items[x], x)))}
    header: dict[str, list[object]] = {item: [frequent_items[item], None] for item in frequent_items}
    root = FPNode(None, 0, None)

    for transaction in transactions:
        ordered = [item for item in transaction if item in frequent_items]
        ordered.sort(key=lambda item: order[item])
        node = root
        for item in ordered:
            if item not in node.children:
                node.children[item] = FPNode(item, 0, node)
                if header[item][1] is None:
                    header[item][1] = node.children[item]
                else:
                    link = header[item][1]
                    while link.link is not None:
                        link = link.link
                    link.link = node.children[item]
            node = node.children[item]
            node.count += 1

    return root, header


def fp_growth(
    header: dict[str, list[object]],
    min_count: int,
    suffix: frozenset[str] | None = None,
) -> dict[frozenset[str], int]:
    suffix = suffix or frozenset()
    frequent: dict[frozenset[str], int] = {}
    items = sorted(header, key=lambda item: (header[item][0], item))

    for item in items:
        support = int(header[item][0])
        new_itemset = suffix | frozenset([item])
        frequent[new_itemset] = support

        conditional_transactions: list[list[str]] = []
        node = header[item][1]
        while node is not None:
            path: list[str] = []
            parent = node.parent
            while parent is not None and parent.item is not None:
                path.append(parent.item)
                parent = parent.parent
            for _ in range(node.count):
                conditional_transactions.append(path)
            node = node.link

        if conditional_transactions:
            _, conditional_header = build_fp_tree(conditional_transactions, min_count)
            if conditional_header:
                frequent.update(fp_growth(conditional_header, min_count, new_itemset))

    return frequent


def generate_rules(
    frequent_itemsets: dict[frozenset[str], int],
    transactions: list[frozenset[str]],
    min_confidence: float,
) -> list[dict[str, object]]:
    total = len(transactions)
    rules: list[dict[str, object]] = []

    for itemset, complete_count in frequent_itemsets.items():
        if len(itemset) < 2:
            continue
        for size in range(1, len(itemset)):
            for antecedent_tuple in combinations(sorted(itemset), size):
                antecedent = frozenset(antecedent_tuple)
                consequent = itemset - antecedent
                antecedent_count = support_count(transactions, antecedent)
                confidence = complete_count / antecedent_count
                if confidence >= min_confidence:
                    rules.append(
                        {
                            "antecedent": tuple(sorted(antecedent)),
                            "consequent": tuple(sorted(consequent)),
                            "support": complete_count / total,
                            "confidence": confidence,
                            "antecedent_count": antecedent_count,
                            "complete_count": complete_count,
                        }
                    )

    return sorted(
        rules,
        key=lambda rule: (
            -float(rule["confidence"]),
            -float(rule["support"]),
            rule["antecedent"],
            rule["consequent"],
        ),
    )


def fmt_items(items: tuple[str, ...]) -> str:
    return ", ".join(items)


def print_rules(title: str, rules: list[dict[str, object]]) -> None:
    print(title)
    print("-" * len(title))
    for index, rule in enumerate(rules, start=1):
        print(
            f"{index:02d}. {fmt_items(rule['antecedent'])} -> {fmt_items(rule['consequent'])} | "
            f"suporte={float(rule['support']):.2%} | confianca={float(rule['confidence']):.2%}"
        )
    print()


def main() -> None:
    attributes, transactions = load_arff_transactions(BASE)
    min_count = int(len(transactions) * MIN_SUPPORT + 0.999999)

    apriori_itemsets = apriori(transactions, MIN_SUPPORT)
    apriori_rules = generate_rules(apriori_itemsets, transactions, MIN_CONFIDENCE)

    ordered_transactions = [list(transaction) for transaction in transactions]
    _, fp_header = build_fp_tree(ordered_transactions, min_count)
    fp_itemsets = fp_growth(fp_header, min_count)
    fp_rules = generate_rules(fp_itemsets, transactions, MIN_CONFIDENCE)

    print(f"Base: {BASE}")
    print(f"Registros: {len(transactions)}")
    print(f"Atributos: {', '.join(attributes)}")
    print(f"Suporte minimo: {MIN_SUPPORT:.0%}")
    print(f"Confianca minima: {MIN_CONFIDENCE:.0%}")
    print()
    print_rules("Apriori - 14 regras mais fortes", apriori_rules[:14])
    print_rules("FP-Growth - 14 regras mais fortes", fp_rules[:14])

    if apriori_rules[:14] == fp_rules[:14]:
        print("Os dois algoritmos encontraram as mesmas 14 regras no mesmo criterio de ordenacao.")


if __name__ == "__main__":
    main()
