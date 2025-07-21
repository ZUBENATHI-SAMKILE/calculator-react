import React, { useState } from 'react';

const Calculator = () => {

    const [expression, setExpression] = useState('');
    const [result, setResult]  = useState('');


    const handleClick = (value) => {
        if(value === 'C') {
            setExpression('')
            setResult('');
        }else if (value === '=') {
            if (expression.trim() === '') {
                 setResult('Enter something');
                return;
                }
                
            fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}`)
            .then(res =>res.text())
            .then(data => setResult(data))
            .catch(() => setResult('Error'));
        } else{
            setExpression(expression + value)
        }
    };

    const buttons = [ 
    '7', '8', '9', '/',  
    '4', '5', '6', '*',   
    '1', '2', '3', '-',   
    '0', '.', '=', '+',   
    'C'
    ];
  return (
    <div>
        <div className=' calculator'>
            <input type='text' value={expression} placeholder='0' readOnly />

            <input type='text' value={result} placeholder='Answer' readOnly className='result' />

            <div className='buttons' >
                {buttons.map((btn,index) => (
                    <button key={index} onClick={() => handleClick(btn)}>
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Calculator