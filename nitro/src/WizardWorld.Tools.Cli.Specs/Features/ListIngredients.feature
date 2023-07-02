Feature: List ingredients
	In order to know what ingredients are available
	As a student wizard
	I want to list the names of the ingredients

@ingredients
Scenario: List all ingredients
	Given the following ingredients:
	| Name        |
	| Frog brains |
	| Red spider  |
	| Snake fangs |
	When I list all ingredients
	Then the following ingredient names are displayed:
	| Name        |
	| Frog brains |
	| Red spider  |
	| Snake fangs |