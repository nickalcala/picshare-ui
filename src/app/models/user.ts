export class User {
    private _name: string;
    private _email: string;

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get email(): string {
		return this._email;
	}

	public set email(value: string) {
		this._email = value;
	}
}