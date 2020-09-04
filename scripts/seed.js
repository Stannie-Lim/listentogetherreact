const { db, Room } = require("../src/server/db/models");

const seed = async () => {
  await db.sync({ force: true });
  console.log("seeding");

  try {
    const room = await Room.create({ id: Math.random().toString(36).substring(7) });
    
  } catch (err) {
    console.log(err);
  }

  console.log("closing db connection");
  await db.close();
  console.log("db closed");
};

if (module === require.main) {
  seed();
}
