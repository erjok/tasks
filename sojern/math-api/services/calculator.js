function min(numbers, count) {
    numbers.sort((a, b) => a - b);
    return numbers.slice(0, count);
}

function max(numbers, count) {
    numbers.sort((a, b) => b - a);
    return numbers.slice(0, count);
}

function avg(numbers) {
    return numbers.reduce((a, b) => a + b) / numbers.length;
}

function median(numbers) {
    numbers.sort((a, b) => a - b);
    const isOdd = numbers.length % 2 === 1;
    if (isOdd) {
        const midIndex = Math.floor(numbers.length / 2);
        return numbers[midIndex];
    } else {
        const firstMidNumber = numbers[numbers.length / 2 - 1];
        const secondMidNumber = numbers[numbers.length / 2];
        return (firstMidNumber + secondMidNumber) / 2;
    }
}

export default {
    min,
    max,
    avg,
    median,
}