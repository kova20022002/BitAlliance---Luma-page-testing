function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(7);
    return `User_${randomString}@gmail.com`;
  }

const mail = generateRandomEmail();

console.log(mail);