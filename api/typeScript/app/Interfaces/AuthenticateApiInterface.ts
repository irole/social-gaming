export interface AuthenticateApiInterface {
    public(req, res, next);
    private(req, res, next);
    semiPrivate(req, res, next);
}
