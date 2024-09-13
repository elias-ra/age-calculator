import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [dayError, setDayError] = useState(null)
  const [monthError, setMonthError] = useState(null)
  const [yearError, setYearError] = useState(null)
  const date = new Date()
  const nowDay = date.getDate()
  const nowMonth = date.getMonth() + 1
  const nowYear = date.getFullYear()
  const [day, setDay] = useState(null)
  const [month, setMonth] = useState(null)
  const [year, setYear] = useState(null)
  const [yresult, setYresult] = useState('--')
  const [mresult, setMresult] = useState('--')
  const [dresult, setDresult] = useState('--')
  const [daysOfMonth, setDaysOfMonths] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      if(!day){
        setDayError('This field is required')
      }
      else if(day.length >= 3 || day >= 32){
       setDayError('Must be a valid day')
      }
      else{
       setDayError(null)
      }

      if(!month){
        setMonthError('This field is required')
      }
      else if(month.length >= 3 || month >= 13){
       setMonthError('Must be a valid month')
      }
      else{
       setMonthError(null)
      }

      if(day){
        if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
          if(day >= 32){
            setDayError('Must be a valid day')
          }else{
            setDaysOfMonths(31)
            setDayError(null)
          }
        }

        else if(month == 4 || month == 6 || month == 9 || month == 11){
          if(day >= 31){
            setDayError('Must be a valid day')
          }else{
            setDaysOfMonths(30)
            setDayError(null)
          }
        }
        
        else if(month == 2){
          if(day >= 30){
            setDayError('Must be a valid day')
          }else{
            setDaysOfMonths(29)
            setDayError(null)
          }
      }
      }

      if(!year){
        setYearError('This field is required')
      }
      else{
        setYearError(null)
      }

      if(year >= nowYear){
        if(year > nowYear){
          setDayError('Must be a valid date')
        }
        else{
          if(month >= nowMonth){
            if(month > nowMonth){
              setDayError('Must be a valid date')
            }else{
              if(day > nowDay){
                setDayError('Must be a valid date')
              }else if(!dayError){
                setDayError(null)
              }
            }
          }
        }
      }

    }catch(err){
      console.log(err)
    }

    if(!dayError && !monthError && !yearError){
      let resultYear = nowYear - year;
      let resultMonth = nowMonth - month;
      let resultDay = nowDay - day;

      if(resultDay < 0){
        resultMonth -= 1;
        resultDay += daysOfMonth;
        setDresult(resultDay);
      }else{
        setDresult(resultDay)
      }

      if(resultMonth < 0){
        resultYear -= 1;
        resultMonth += 12
        setMresult(resultMonth) 
      }else{
        setMresult(resultMonth)
      }

      setYresult(resultYear);

    }else{
      setDresult('--')
      setMresult('--')
      setYresult('--')
    }
  }
  let error = false;
  if(dayError || monthError || yearError){
    error = true;
  }else{
    error = false;
  }
  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div id="inputs">
            <label className='label day'>
              {!error && 
                <React.Fragment>
                  <span className='date'>DAY</span>
                  <input type="number" maxLength="2"
                    onChange={e => setDay(e.target.value)}
                    placeholder='DD'
                    value={day}
                  />
                </React.Fragment>
              }
              {error&& 
                <React.Fragment>
                  <span className='errorSpan'>DAY</span>
                  <input className='errorInput' type="number" maxLength="2"
                    onChange={e => setDay(e.target.value)}
                    placeholder='DD'
                    value={day}
                  />
                </React.Fragment>
              }
              {dayError && 
                <span className="errorText">{dayError}</span>
              }
            </label>
            <label className='label month'>
              {!error && 
                <React.Fragment>
                  <span className='date'>MONTH</span>
                  <input type="number" maxLength="2" 
                    onChange={e => setMonth(e.target.value)}
                    value={month}
                    placeholder='MM'
                  />
                </React.Fragment>
              }
              {error && 
                <React.Fragment>
                  <span className='errorSpan'>MONTH</span>
                  <input className='errorInput' type="number" maxLength="2" 
                    onChange={e => setMonth(e.target.value)}
                    value={month}
                    placeholder='MM'
                  />
                </React.Fragment>
              }
              {monthError && 
                <span className="errorText">{monthError}</span>
              }
            </label>
            <label className='label year'>
              {!error && 
                <React.Fragment>
                  <span className='date'>YEAR</span>
                  <input type="number" maxLength='4'
                    onChange={e => setYear(e.target.value)}
                    value={year}
                    placeholder='YYYY'
                  />
                </React.Fragment>
              }
              {error && 
                <React.Fragment>
                  <span className='errorSpan'>YEAR</span>
                  <input className='errorInput' type="number" maxLength="4" 
                    onChange={e => setYear(e.target.value)}
                    value={year}
                    placeholder='YYYY'
                  />
                </React.Fragment>
              }
               {yearError && 
                <span className='errorText'>{yearError}</span>
               }     
            </label>
          </div>
          <div className="submit">
            <span></span>
            <button><i className="material-icons">check</i></button>
          </div>
        </form>
        <div className="results">
          <div className="result years">
            <span className="dash yresult">{yresult}</span>
            <span className="name">years</span>
          </div>
          <div className="result months">
            <span className="dash mresult">{mresult}</span>
            <span className="name">months</span>
          </div>
          <div className="result days">
            <span className="dash dresult">{dresult}</span>
            <span className="name">days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
