const openpgp = require("openpgp");
const fs = require("fs");

const encryptMessage = async (filename, message, ...passwords) => {
  const messageToEncrypt = await openpgp.createMessage({
    text: message,
  });
  const encrypted = await openpgp.encrypt({
    message: messageToEncrypt,
    passwords: [...passwords],
    armor: true,
  });

  try {
    fs.writeFileSync(filename, encrypted);
  } catch (err) {
    console.error(err);
  }
};

const decryptMessage = async (filename, password) => {
  try {
    var encryptedFileMessage = fs.readFileSync(filename, "utf8");
    const encryptedMessage = await openpgp.readMessage({
      armoredMessage: encryptedFileMessage,
    });

    const { data } = await openpgp.decrypt({
      message: encryptedMessage,
      passwords: [password],
      format: "text",
    });
    console.log(data);
  } catch (ex) {
    console.log(ex.message);
  }
};

const callEncryptMessages = () => {
  encryptMessage(
    "EncryptedFiles/FirstEncryption.txt",
    "Hello Aman! This is an first feedback.",
    "Password1",
    "Password2",
    "Password3"
  );

  encryptMessage(
    "EncryptedFiles/SecondEncryption.txt",
    "Hello Aman! This is an second feedback.",
    "Password4",
    "Password5",
    "Password6"
  );

  encryptMessage(
    "EncryptedFiles/ThirdEncryption.txt",
    "Hello Aman! This is an third feedback.",
    "Password7",
    "Password8",
    "Password9"
  );
};

//callEncryptMessages();

decryptMessage("EncryptedFiles/ThirdEncryption.txt", "Password5");
