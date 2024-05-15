function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(7);
    return `user${randomString}@gmail.com`;
  }

const email = generateRandomEmail();

export const TestData = {
    firstName: 'Amir',
    lastName: 'Badsdsa',
    email: email,
    password: 'Emir12345',
    passwordConfirmation: 'Emir12345'
}


