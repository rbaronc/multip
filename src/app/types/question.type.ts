export type Question = {
    multiplicand: number,
    multiplier: number,
    text: string,
    rightAnswer: number,
    givenAnswer: number | null,
    result: boolean | null
};