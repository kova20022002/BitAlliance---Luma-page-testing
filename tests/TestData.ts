export const TestData = {
    firstName: 'Amir',
    lastName: 'Badsdsa',
    randomEmail: generateRandomEmail(),
    password: 'Emir12345',
    passwordConfirmation: 'Emir12345'
}

function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(7);
    return `User_${randomString}@gmail.com`;
  }