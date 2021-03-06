// const { routesDir } = require('../../../app');

const Joi = require('joi');
const validateRequest = require('../../request-validator.js');

// Here are the functions to handle each endpoint
const transactionsServices = require('./transactions-services');

var express = require('express');
var router = express.Router();

router.get('/', listTransactions);
router.get('/:id', listById); // Search transaction by ID
router.post('/', saveTransaction); // Create new transaction
router.put('/:id', editTransaction); // Update transaction
router.delete('/:id', deleteTransaction); // Delete category

function listTransactions( req, res, next ) {
    // Query strings
    // search: String; -> If assinged will try to find records that match the "search" parameter value
    
    transactionsServices.getTransactionsByText( req.query.search )
    .then( result => res.json( result ) )
    .catch( next );
}

function listById(req, res, next) {
    
    transactionsServices.getTransactionById( req.params.id )
        .then( function( promiseResult ) {
            if ( !promiseResult ) {
                res.status(400).json( {
                    error: true,
                    message: `Transaction not found!`
                } )
            }
            
            res.status(200).json( promiseResult );
        } )
        .catch ( next );
}

function saveTransaction( req, res, next ) {

    transactionsServices.insertNewTransaction( req.body )
        .then( function ( promiseResult ) {
            
            if (promiseResult.error) {
                res.status(400).json( promiseResult );
            }
            else {
                res.status(200).json( promiseResult );
            }

        })
        .catch( next );
}

function editTransaction( req, res, next ) {
    
    req.body.id = req.params.id;

    transactionsServices.editTransaction( req.body )
        .then( function ( promiseResult ) {
            
            if (promiseResult.error) {
                res.status(400).json( promiseResult );
            }
            else {
                res.status(200).json( promiseResult );
            }

        })
        .catch( next );
}

function deleteTransaction(req, res, next) {

    transactionsServices.deleteTransaction( req.params.id )
        .then( function ( deleteResult ) { 
            if ( deleteResult.error ) {
                res.status(400).json( deleteResult );
            }
            else {
                res.json( deleteResult );
            }
        } )
        .catch( next );

}

module.exports = router;