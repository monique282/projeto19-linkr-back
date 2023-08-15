import { selectAllItems } from "../repositories/home.repository.js";

export const getAllItems = async (req, res) => {
  try {
    await selectAllItems;
  } catch (err) {
    res.status(500).send(err.message);
  }
};
