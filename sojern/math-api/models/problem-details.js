export default class ProblemDetails {
    type;
    title;
    status;
    errors;

    constructor(props) {
        Object.assign(this, props);
    }

    static fromError(error) {
        if (error.code === 'ValidationError') {
            return new ProblemDetails({
                status: 400,
                title: error.message,
                errors: error.errors,
            });
        }

        return new ProblemDetails({
            status: 500,
            title: error.message,
        });
    }
}