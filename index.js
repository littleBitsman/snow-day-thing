const brain = new (require('brain.js').NeuralNetwork)({
    hiddenLayers: [4]
})
const prompt = require('prompt')

const input = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[10,0],[10,1],[10,2],[10,3],[10,4],[10,5],[10,100],[10,115],[8,2]]
const output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1]

brain.train(input.map((inp, i) => {
    return {
        input: inp,
        output: [output[i]]
    }
}))

async function main() {
    while (true) {
        const { inches, days } = await prompt.get({
            properties: {
                inches: {
                    required: true,
                    message: 'Inches should be a number',
                    pattern: /(?!\D)\d+(?!\D)/g,
                    description: 'Inches of snow'
                },
                days: {
                    required: true,
                    message: 'Already used snow days should be a number',
                    pattern: /(?!\D)\d+(?!\D)/g,
                    description: 'Snow days you already had'
                }
            }
        })
        const res = Math.floor(brain.run([parseInt(inches), parseInt(days)])[0] * 10000) / 100
        console.log(`Prediction: ${res}% chance of snow day`)
    }
}

main()