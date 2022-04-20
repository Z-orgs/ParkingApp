import { Router } from "express";
var router = Router();
import {
  getUserById,
  getAllUser,
  addUser,
  deleteUser,
  updateUser,
} from "./Models/User";
router.get("/:id?", function (req, res, next) {
  if (req.params.id) {
    getUserById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    getAllUser(function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.post("/", function (req, res, next) {
  addUser(req.body, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

router.delete("/:id", function (req, res, next) {
  deleteUser(req.params.id, function (err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});

router.put("/:id", function (req, res, next) {
  updateUser(req.params.id, req.body, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
export default router;
