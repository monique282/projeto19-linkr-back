import { selectAllItems } from "../repositories/home.repository.js";

export const getAllItems = async (req, res) => {
  try {
    return await selectAllItems();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

