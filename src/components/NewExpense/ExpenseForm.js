import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  //   const [userInput, setUserInput] = useState({
  //     enteredTitle: '',
  //     enteredAmount: '',
  //     enteredDate: ''
  //   });

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
    // NOTE the below will do the same, but isn't best practice. If relying on previous state, use the current function!!
    // setUserInput({
    //     ...userInput,
    //     enteredTitle: event.target.value
    // })
    // NOTE React schedules state updates, it doesnt update instantly. So theoretically, if you schedule a lot of state updates at the same time, you could end up depending on an outdated or incorrect state snapshot by using the above approach.
    // NOTE the below approach makes sure youre using the updated state snapshot, keeping all scheduled state snapshots in mind.
    // setUserInput((prevState) => {
    //     return {...prevState, enteredTitle: event.target.value}
    // })
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    // setUserInput((prevState) => {
    //     return {...prevState, enteredAmount: event.target.value}
    // })
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    // setUserInput((prevState) => {
    //     return {...prevState, enteredDate: event.target.value}
    // })
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);
    // NOTE below is part of 2 way binding, as well as the values on the input elements. This allows us to gather user input as well as change it back to the original state in the input form(s).
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
