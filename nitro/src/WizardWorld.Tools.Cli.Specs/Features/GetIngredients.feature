Feature: Get ingredients
	In order to know what ingredients are available
	As a student wizard
	I want to get the names of the ingredients

@ingredients
Scenario: Get all ingredients
	Given the following ingredients:
	| Name        |
	| Frog brains |
	| Red spider  |
	| Snake fangs |
	When I get all ingredients
	Then the following ingredient names are displayed:
	| Name        |
	| Frog brains |
	| Red spider  |
	| Snake fangs |