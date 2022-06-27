function InfoTooltip ({name, isOpen, img, title, onClose}) {
    const classNamePopup = `popup ${name}-popup ${isOpen ? 'popup_opened' : ''}`
  
  return (
    <div className={classNamePopup}>
      <div className="infoToolTip">
        <img src={img} alt={title} className="infoToolTip__image"/>
        <h2 className="infoToolTip__title">{title}</h2>
      </div>
      <button className="popup__button-glose edit-form__button-glose" type="button" onClick={onClose}></button>
    </div>  
  )
}

export default InfoTooltip