import { connect } from "../../../utils/connection";

const handler = async (req, res) => {
  const catcher = (err) => res.status(400).json({ err });

  const method = req.method;

  const handleCase = {
    GET: async (req, res) => {
      const { Todo } = await connect();
      res.json(await Todo.find({}).catch(catcher));
    },
    POST: async (req, res) => {
      const { Todo } = await connect();
      res.json(await Todo.create(req.body).catch(catcher));
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
