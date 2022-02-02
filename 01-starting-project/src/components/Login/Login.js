import React, { useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => { //metot login ichinde 5 steit bar
  const [enteredEmail, setEnteredEmail] = useState('');//email jasylat
  const [emailIsValid, setEmailIsValid] = useState();//emaildy teksherebiz
  const [enteredPassword, setEnteredPassword] = useState('');//parol jasylat 
  const [passwordIsValid, setPasswordIsValid] = useState();//parol teksherebiz
  const [formIsValid, setFormIsValid] = useState(false);// forma pustoi bolup kalsa false bolush kerek.. Egerde forma tolturulsa ture bolush kerek

  const emailChangeHandler = (event) => { //Это emailChangeHandler булар input тун ичинде OnChange={} менен чакырылат
    setEnteredEmail(event.target.value); //Бул жерде ошолордун value син алып туруп enteredEmail дын ичине сактап жатабыз
    setFormIsValid( //Мы вызываем здесь setFormIsValid
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );//event.target.value email дын знычениясын алып жатабыз анан includes(‘@’) включает ли он собачку @ эсли выключает анда true болуп калат а патом оператор && жана проверка enteredPassword.trim().length > 6 жазган паролубуз 6 дан жогору болсо парол туура жасылган деген логика бул жерде
  };
  const passwordChangeHandler = (event) => { //Это passwordChangeHandler тоже самое passwordChangeHandler менен иштетекенде setFormIsValid сакырылса
    setEnteredPassword(event.target.value);
    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );//Бул жеред биринчи ошол парольду текшерет паролду жаздык туура эле бул жер true болот && жана деп биз ошол email ды текшерип койобуз email ды жазканбыз true болсо бул жер общий true кайтарат патом useState(true)деп сактап койот
  };
  const validateEmailHandler = () => { //Бул функция кторый вот кайра ле ошол setEmailIsValid ди чакырып жатат
    setEmailIsValid(enteredEmail.includes('@')); //Если собачкасы бар болсо значить email valid true калйтарып койот проста
  };
  const validatePasswordHandler = () => { // Бул функция болсо
    setPasswordIsValid(enteredPassword.trim().length > 6); //Пароль ду trim() кылып lebgth ны проверка кылып 6 > дан  жогору болсо бул деле true кайтарып койот
  };
  const submitHandler = (event) => { //Бул жерде ошол жана setFormIsValid useState(true) эмнеге сактап койот десек бул жерде submit кылгында
    event.preventDefault(); //Мы потом можем проверить форма толтурулдубу же толтурулбадыбы
    props.onLogin(enteredEmail, enteredPassword);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
