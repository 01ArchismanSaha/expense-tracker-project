const trackerFrom = document.getElementById('tracker-form');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const expenseItems = document.getElementById('expense-items');


trackerFrom.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log('frontend: ',amount.value, description.value, category.value);

    try {   
        await axios.post('http://localhost:4000/expense/add-expense', {
            amount: amount.value,
            description: description.value,
            category: category.value
        });
    
        const expenses = await fetchExpensesFromBackend();

        showExpensesOnFrontend(expenses);

    } catch (error) {
        console.log(error);
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    const expenses = await fetchExpensesFromBackend();

    showExpensesOnFrontend(expenses);
});

expenseItems.addEventListener('click', async (e) => {
    // console.log('event target: ', e.target.parentElement.id);
    const id = e.target.parentElement.id;
    try {
        await axios.delete(`http://localhost:4000/expense/delete-expense/${id}`);

        expenseItems.removeChild(document.getElementById(`${id}`));
        
    } catch (error) {
        console.log(error);
    }

});

function showExpensesOnFrontend(expenses) {
    console.log('expenses: ', expenses);

    expenseItems.innerHTML = '';

    for(let i = 0; i < expenses.length; i ++){
        // console.log(expenses[i]);
        const expense = expenses[i];
        expenseItems.innerHTML += `
            <li id="${expense.id}">
                ${expense.amount}-${expense.description}-${expense.category}
                <button>Delete</button>
            </li>
        `;
    }    
};

async function fetchExpensesFromBackend() {
    try {
        const res = await axios.get('http://localhost:4000/expense/get-expense');

        const expenses = res.data;
        return expenses;

    } catch (error) {
        console.log(error);
    }
}