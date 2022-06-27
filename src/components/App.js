import React from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';

import Header from './Header';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import {register, authorize, getCheckToken} from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectCard, setSelectCard] = React.useState(null)
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({})

   
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory()
  const [message, setMessage] = useState({ imgPath: '', text: '' })


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCards(cards)
        setCurrentUser(user)
      })
      .catch((err) => console.log(err))
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectCard(null)
  }

  function onCardClick(card) {
    setSelectCard(card)
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(userAvatar) {
    api.setUserAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card))
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(dataNewCard) {
    api.addCard(dataNewCard)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }
  
  useEffect(() => {
    tokenCheck()
  }, [])

  function tokenCheck() {
    if(localStorage.getItem('jwt') {
      getCheckToken(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true)
            setEmail(res.data.email)
            history.push('/')
          }
        })
    }

  }

  function handleRegistration (password, email) {
    register(password, email)
    .then((result) =>{
        setEmail(result.data.email)
        setMessage({ img: success, text: 'Вы успешно зарегистрировались!' })
      })
      .catch(() => setMessage({ img: unSuccess, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function handleAuth(password, email) {
    authorize(password, email)
    .then((token => {
      checkToken(token)
        .then((res) => {
          setEmail(res.data.email)
          setLoggedIn(true)
          history.push('/')
        })
    }))
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(true);
    history.push('/login');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />
        <Switch>
          <Route exact path="/sign-up">
            <Register
              onRegister={handleRegistration}
            />       
          </Route> 
          <Route exact path="/sign-in">
            <Login 
              onAuth={handleAuth}
            />
          </Route>
          <ProtectedRoute
            exact path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          </Route>
        </Switch>

        <Footer />
        <div className="page__cover"></div>

        <InfoTooltip
        name={ToolTip}
        isOpen={isInfoTooltipOpen}
        img={message.img}
        title={message.text}
        onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
         />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
        />

        <ImagePopup
          card={selectCard}
          onClose={closeAllPopups}
        />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
