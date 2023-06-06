# Tally App
A tally app is a software application or tool that allows users to count and keep track of numbers or quantities. It is designed to provide a simple and convenient way to increment or decrement values and maintain a record of counts


- [Tally App](#tally-app)
  - [Features](#features)
  - [User](#user)
    - [Scenario 1: Clicking the "+" button increments the value](#scenario-1-clicking-the--button-increments-the-value)
    - [Scenario 2: Clicking the "-" button decrements the value](#scenario-2-clicking-the---button-decrements-the-value)


## Features

- **Increment a value using the "+" button**: Allows users to increase the value by a specified step amount.
- **Decrement a value using the "-" button**: Enables users to decrease the value by a specified step amount.

## User

### Scenario 1: Clicking the "+" button increments the value

Given the number input field is displayed  
And the initial value is 0  
When I click the "+" button  
Then the value should increase by the step amount  
And the "+" button should remain enabled  
And the "-" button should be enabled if the value was previously at the minimum number

### Scenario 2: Clicking the "-" button decrements the value

Given the number input field is displayed  
And the initial value is 0  
When I click the "-" button  
Then the value should decrease by the step amount  
And the "-" button should remain enabled
