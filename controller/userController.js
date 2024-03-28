const { User, Thought, Reaction } = require('../model');
const { NotFoundError, BadRequestError } = require('../utils/errors');
module.exports = {
  /**
   * @param {import('express').Request} req epxress Request Object
   * @param {import('express').Response} res express Response Object
   */
  async findAllUsers(req, res) {
    const users = await User.findAll({
      include: [
        {
          model: Thought,
          include: [{model: Reaction}]
        },
        { model: Reaction },
        {
          model: User,
          as: 'friend',
          through: {attributes: []},
        },
      ],
    })

    if (!users.length) {
      throw new NotFoundError('No users found in the database');
    }

    res.status(200).json({ msg: 'success', users })
  },

  /**
   * @param {import('express').Request} req epxress Request Object
   * @param {import('express').Response} res express Response Object
   */
  async findOneUser(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Thought,
          include: [{model: Reaction}],
        },
        { model: Reaction },
        {
          model: User,
          as: 'friend',
          through: {attributes: []},
        }
      ],
    })

    if (!user) {
      throw new NotFoundError(`No user found with id ${id}`);
    }

    res.status(200).json({ msg: 'success', user });
  },

  /**
   * @param {import('express').Request} req epxress Request Object
   * @param {import('express').Response} res express Response Object
   */
  async createUser(req, res) {
    const { username, email } = req.body;

    if (!(username && email)) {
      throw new BadRequestError('Missing username or email. Try again');
    }

    const user = await User.create({ username, email });

    res.status(200).json({ msg: 'success', user });
  },

  /**
   * @param {import('express').Request} req epxress Request Object
   * @param {import('express').Response} res express Response Object
   */
  async updateUser(req, res) {
    const { username, email } = req.body;
    const { id } = req.params;

    if (!(username || email)) {
      throw new BadRequestError('Missing data. Nothing to update.');
    }

    const tmp = await User.findByPk(id);
    if (!tmp) {
      throw new NotFoundError(`No user found with id ${id}`);
    }

    const user = await User.update(
      { username, email },
      { where: {id}}
    )

    if (!user[0]) {
      throw new BadRequestError('Nothing to update. Data is the same');
    }

    res.status(200).json({ msg: 'success', user });
  },

  /**
   * @param {import('express').Request} req epxress Request Object
   * @param {import('express').Response} res express Response Object
   */
  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });

    if (!user) {
      throw new NotFoundError(`No user found with id ${id}`);
    }

    res.status(200).json({ msg: 'success' });
  },

  /**
   * @param {import('express').Request} req epxress Request Object
   * @param {import('express').Response} res express Response Object
   */
  async addFriend(req, res) {
    const { id, friendId } = req.params;

    const tmp = await User.findByPk(+id);

    if (!tmp) {
      throw new NotFoundError(`No user found with id ${id}`);
    }

    const user = await tmp.addFriend(+friendId);

    res.status(200).json({msg: 'success', user})
  }
}