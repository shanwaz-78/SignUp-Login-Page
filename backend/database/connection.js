import { connect } from "mongoose";

async function createConnectionn(mongoURL) {
  const connection = await connect(mongoURL);
  return connection;
}

export default createConnectionn;
