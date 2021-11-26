import { connect } from "../../../utils/connection";

const handler = async (req, res) => {
  const method = req.method;

  const catcher = (err) => res.status(400).json({ err });

  const id = req.query.id;

  const handleCase = {
    GET: async (req, res) => {
      const { Todo } = await connect();
      res.json(await Todo.findById(id).catch(catcher));
    },

    PUT: async (req, res) => {
      const { Todo } = await connect();
      res.json(
        await Todo.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
      );
    },

    DELETE: async (req, res) => {
      const { Todo } = await connect();
      res.json(await Todo.findByIdAndRemove(id).catch(catcher));
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
