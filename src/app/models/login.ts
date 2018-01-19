export class Login {
    private _id: number;
    private _name: string;
    private _email: string;
    private _accessToken: string;

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

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

	public get accessToken(): string {
		return this._accessToken;
	}

	public set accessToken(value: string) {
		this._accessToken = value;
	}
}