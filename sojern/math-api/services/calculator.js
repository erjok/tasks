function min(numbers, count) {
    numbers.sort((a, b) => a - b);
    return numbers.slice(0, count);
}

export default {
    min
}