# Decision Matrix Task Prioritizer

A web-based tool that helps you prioritize tasks using a weighted decision matrix approach. By breaking down tasks into distinct dimensions and automating the calculation of importance scores, this tool reduces decision fatigue and improves task prioritization.


## Low-Level Thinking

Breaking down tasks into distinct dimensions offers several benefits:

1. **Reduced Bias**: Evaluating specific aspects separately prevents any single factor from unduly influencing your assessment
2. **Critical Thinking**: Scoring each dimension individually forces you to consider different aspects of your tasks carefully
3. **Consistent Evaluation**: Using the same dimensions across all tasks ensures standardized prioritization
4. **Adaptability**: Easily adjust individual dimension scores as circumstances change

## High-Level Thinking

The tool combines dimensional scores into a single importance score, which:

1. **Reduces Decision Fatigue**: Get clear priorities without constantly juggling multiple factors in your head
2. **Provides Objectivity**: Uses consistent calculations to compare different types of tasks
3. **Enables Quick Updates**: Automatically recalculates priorities when you adjust individual dimensions
4. **Enhances Focus**: Spend less time prioritizing and more time executing


## Usage

1. Enter your task name
2. Rate each dimension using the sliders (0-10)
3. Click "Add Task" to add it to your priority list
4. Tasks automatically sort by importance score
5. Adjust scores anytime using the sliders
6. Remove tasks using the delete button

## Best Practices

1. **Be Objective**: The tool is only as good as your input
2. **Use the Full Scale**: Don't shy away from extreme scores when appropriate
3. **Review Regularly**: Update scores as circumstances change
4. **Consider Context**: Use the importance score as a guide, not an absolute rule


## Technical Details

Built with vanilla JavaScript and CSS, no external dependencies. The importance score is calculated using a weighted sum of dimension scores, with weights reflecting the relative importance of each dimension.


## Contributing

Feel free to fork this repository and submit pull requests. Please maintain the tool's focus on simplicity and ease of use.

## License

MIT License