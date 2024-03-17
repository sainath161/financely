import React from 'react'
import "./styles.css"
import { Card, Row } from 'antd'
import Button from '../Button'

function Cards({showExpenseModal, showIncomeModal, income, expense, totalBalance, resetBalance}) {
  return (
    <div>
        <Row className='myRow'>
            <Card className='myCard' bordered={true}>
                <h2>Current Balance</h2>
                <p className='amount'>₹{totalBalance}</p>
                <Button className="btns" text= "Reset Balance" blue={true} onClick={resetBalance} />
            </Card>

            <Card className='myCard' bordered={true}>
                <h2>Total Income</h2>
                <p className='amount'>₹{income}</p>
                <Button className="btns" text= "Add income" blue={true} onClick={showIncomeModal}/>
            </Card>

            <Card className='myCard' bordered={true}>
                <h2>Total Expenses</h2>
                <p className='amount'>₹{expense}</p>
                <Button className="btns" text= "Add Expense" blue={true} onClick={showExpenseModal}/>
            </Card>
        </Row>
    </div>
  )
}

export default Cards