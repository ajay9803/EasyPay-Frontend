export class RegisterActions {
    static register: () => void = () => {
        const registerUser = () => {
            console.log('User Registered.');
        }

        const registerButton = document.getElementById('register-button') as HTMLButtonElement;
        registerButton.onclick = (e: MouseEvent) => {
            e.preventDefault();

            registerUser();
        }
    }
}