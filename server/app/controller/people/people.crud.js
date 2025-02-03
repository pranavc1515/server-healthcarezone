const personServices = require("../../services/people/people.crud");
exports.addPeople = function (req, res, next) {
  personServices
    .addPeople(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
};
exports.getByCategoryRef = function (req, res, next) {
  personServices
    .getByCategoryRef(req)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
};
exports.getByRole = function (req, res, next) {
  personServices
    .getByRole(req)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
};
exports.getById = function (req, res, next) {
  personServices
    .getById(req)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
};
exports.bookAppointment = function (req, res, next) {
  personServices
    .bookAppointment(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
};
