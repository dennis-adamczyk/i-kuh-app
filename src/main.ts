import './style.css';

const dfMessenger = document.querySelector('df-messenger');

const globalSheet = new CSSStyleSheet();
globalSheet.replaceSync(`
  .df-messenger-wrapper {
    position: flex;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  button#widgetIcon {
    display: none
  }`);

const chatSheet = new CSSStyleSheet();
chatSheet.replaceSync(`
  .chat-wrapper.chat-open {
    height: 100%;
    position: initial;
    right: auto;
    width: 100%;
    border-radius: 0;
  }
  
  .title-wrapper {
    border-radius: 0;
  }
  
  df-messenger-titlebar {
    background-color: var(--df-messenger-button-titlebar-color);
  }`);

const titlebarSheet = new CSSStyleSheet();
titlebarSheet.replaceSync(`
  .title-wrapper {
    border-radius: 0;
    width: 500px;
    max-width: 100%;
    margin: 0px auto;
    box-shadow: none;
  }
  
  .focus-outline-contrast:focus:before {
    display: none;
  }
  
  button#minimizeIconButton {
    display: none;
  }`);

const messageListSheet = new CSSStyleSheet();
messageListSheet.replaceSync(`
  #messageList {
    overflow: hidden auto;
  }

  df-message:not([isbot]) {
    display: flex;
    justify-content: flex-end;
  }

  df-message:not([isbot]) .message.user-message {
    flex-shrink: 1 !important;
  }
  
  .message-list-wrapper {
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
  }`);

const messageUserInputSheet = new CSSStyleSheet();
messageUserInputSheet.replaceSync(`
  .input-container {
    background-color: rgb(255, 255, 255);
    border-radius: 0;
  }

  .input-box-wrapper {
    width: 500px;
    margin: 0 auto;
    max-width: 100%;
  }`);
const cardSheet = new CSSStyleSheet();
cardSheet.replaceSync(`
  df-image {
    display: flex;
  }`);

dfMessenger?.addEventListener('df-response-received', () => {
  const dfMessengerShadowRoot = dfMessenger!.shadowRoot!;

  const dfMessengerChatShadowRoot =
    dfMessengerShadowRoot.querySelector('df-messenger-chat')!.shadowRoot!;

  setTimeout(() => {
    const dfMessangeListShadowRoot =
      dfMessengerChatShadowRoot.querySelector('df-message-list')!.shadowRoot!;

    dfMessangeListShadowRoot
      .querySelector('df-card')
      ?.shadowRoot?.adoptedStyleSheets?.push(cardSheet);
  }, 1);
});

dfMessenger?.addEventListener('df-messenger-loaded', () => {
  const dfMessengerShadowRoot = dfMessenger!.shadowRoot!;
  dfMessengerShadowRoot.adoptedStyleSheets.push(globalSheet);

  const dfMessengerChatShadowRoot =
    dfMessengerShadowRoot.querySelector('df-messenger-chat')!.shadowRoot!;
  dfMessengerChatShadowRoot.adoptedStyleSheets.push(chatSheet);

  setTimeout(() => {
    const dfMessengerTitlebarShadowRoot =
      dfMessengerChatShadowRoot.querySelector('df-messenger-titlebar')!
        .shadowRoot!;
    dfMessengerTitlebarShadowRoot.adoptedStyleSheets.push(titlebarSheet);

    const dfMessangeListShadowRoot =
      dfMessengerChatShadowRoot.querySelector('df-message-list')!.shadowRoot!;
    dfMessangeListShadowRoot.adoptedStyleSheets.push(messageListSheet);

    const dfMessangeUserInputShadowRoot =
      dfMessengerChatShadowRoot.querySelector('df-messenger-user-input')!
        .shadowRoot!;
    dfMessangeUserInputShadowRoot.adoptedStyleSheets.push(
      messageUserInputSheet
    );
  }, 1);
});
