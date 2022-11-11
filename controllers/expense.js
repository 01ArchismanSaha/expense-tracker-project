const Expense = require('../models/expense');

exports.addExpense = async(req, res, next) => {
    const {amount, description, category} = req.body;
    
    console.log(amount, description, category);

    try {
        
        await Expense.create({
            amount: amount,
            description: description,
            category: category
        });

        res.status(200).json({success: true, message: 'expense successfully added'});
        
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
};

exports.getExpense = (req, res, next) => {
    Expense.findAll()
        .then(expenses => {
            res.status(200).json(expenses);
        })
        .catch(err => {
            res.status(500).json({success: false, message: err});
        });
};

exports.deleteExpense = (req, res, next) => {
    const id = req.params.id;
    console.log('id to delete: ', id);
    Expense.findByPk(id)
        .then(async (expense) => {
            try {
                await expense.destroy();
                res.status(200).json({success: true, message: 'expense deleted'});    
            } catch (error) {
                throw new Error(error);
            }  
        })
        .catch(err => {
            res.status(500).json(err);
        });
};