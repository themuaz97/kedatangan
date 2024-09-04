import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";

// roles
export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.roles.findMany(
      {
        where: {
          status: 1
        }
      }
    );

    if (roles) {
      res.status(200).json(roles);
    } else {
      return res.status(404).json({ error: "Roles not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get roles" });
  }
}

export const addRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const role = await prisma.roles.create({
      data: {
        role_name: name,
        status: 1
      }
    });

    if (role) {
      res.status(200).json(role);
    } 
  } catch (error: any) {
    res.status(500).json({ error: "Failed to add role" });
  }
}

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { roleName } = req.body;

    if (!roleName) {
      return res.status(400).json({ error: "Role name is required" });
    }

    const role = await prisma.roles.update({
      where: {
        id: Number(id),
      },
      data: {
        role_name: roleName,
      },
    });

    if (role) {
      return res.status(200).json(role);
    } else {
      return res.status(404).json({ error: "Role not found" });
    }
  } catch (error: any) {
    console.error('Failed to update role:', error);
    return res.status(500).json({ error: "Failed to update role" });
  }
}

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const role = await prisma.roles.update({
      where: {
        id: Number(id),
      },
      data: {
        status: 0
      }
    });

    if (role) {
      res.status(200).json(role);
    } else {
      return res.status(404).json({ error: "Role not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete role" });
  }
}

export const getRolesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const role = await prisma.roles.findUnique({
      where: {
        id: Number(id),
        status: 1
      }
    });

    if (role) {
      res.status(200).json(role);
    } else {
      return res.status(404).json({ error: "Role not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get roles" });
  }
}

// companies
export const getcompanies = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.companies.findMany(
      {
        where: {
          status: 1
        }
      }
    );

    if (companies) {
      res.status(200).json(companies);
    } else {
      return res.status(404).json({ error: "companies not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get companies" });
  }
}

export const addCompany = async (req: Request, res: Response) => {
  try {
    const { name, address, email, phone } = req.body;

    if (!name || !address || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const company = await prisma.companies.create({
      data: {
        name,
        address,
        email,
        phone,
        status: 1
      }
    });

    if (company) {
      res.status(200).json(company);
    } else {
      return res.status(404).json({ error: "company not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to add company" });
  }
}

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id, name, address, email, phone } = req.body;

    if (!name || !address || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const company = await prisma.companies.update({
      where: {
        id
      },
      data: {
        name,
        address,
        email,
        phone
      }
    });

    if (company) {
      res.status(200).json(company);
    } else {
      return res.status(404).json({ error: "company not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update company" });
  }
}

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const company = await prisma.companies.update({
      where: {
        id
      },
      data: {
        status: 0
      }
    });

    if (company) {
      res.status(200).json(company);
    } else {
      return res.status(404).json({ error: "company not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete company" });
  }
}

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const company = await prisma.companies.findUnique({
      where: {
        id: Number(id),
        status: 1
      }
    });

    if (company) {
      res.status(200).json(company);
    } else {
      return res.status(404).json({ error: "company not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get company" });
  }
}

// departments
export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await prisma.departments.findMany(
      {
        where: {
          status: 1
        }
      }
    );

    if (departments) {
      res.status(200).json(departments);
    } else {
      return res.status(404).json({ error: "departments not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get departments" });
  }
}

export const addDepartment = async (req: Request, res: Response) => {
  try {
    const { name, companyId } = req.body;

    if (!name || !companyId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const department = await prisma.departments.create({
      data: {
        name,
        company_id: companyId,
        status: 1
      }
    });

    if (department) {
      res.status(200).json(department);
    } else {
      return res.status(404).json({ error: "department not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to add department" });
  }
}

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id, name, companyId } = req.body;

    if (!name || !companyId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const department = await prisma.departments.update({
      where: {
        id
      },
      data: {
        name,
        company_id: companyId
      }
    });

    if (department) {
      res.status(200).json(department);
    } else {
      return res.status(404).json({ error: "department not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update department" });
  }
}

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const department = await prisma.departments.update({
      where: {
        id
      },
      data: {
        status: 0
      }
    });

    if (department) {
      res.status(200).json(department);
    } else {
      return res.status(404).json({ error: "department not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete department" });
  }
}

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const department = await prisma.departments.findUnique({
      where: {
        id: Number(id),
        status: 1
      }
    });

    if (department) {
      res.status(200).json(department);
    } else {
      return res.status(404).json({ error: "department not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get department" });
  }
}

// positions
export const getPositions = async (req: Request, res: Response) => {
  try {
    const positions = await prisma.positions.findMany(
      {
        where: {
          status: 1
        }
      }
    );

    if (positions) {
      res.status(200).json(positions);
    } else {
      return res.status(404).json({ error: "positions not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get positions" });
  }
}

export const addPosition = async (req: Request, res: Response) => {
  try {
    const { name, deptId, positionLevel } = req.body;

    if (!name || !deptId || !positionLevel) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const position = await prisma.positions.create({
      data: {
        name,
        dept_id: deptId,
        position_level_id: positionLevel,
        status: 1
      }
    });

    if (position) {
      res.status(200).json(position);
    } else {
      return res.status(404).json({ error: "position not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to add position" });
  }
}

export const updatePosition = async (req: Request, res: Response) => {
  try {
    const { id, name, deptId } = req.body;

    if (!name || !deptId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const position = await prisma.positions.update({
      where: {
        id
      },
      data: {
        name,
        dept_id: deptId
      }
    });

    if (position) {
      res.status(200).json(position);
    } else {
      return res.status(404).json({ error: "position not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update position" });
  }
}

export const deletePosition = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const position = await prisma.positions.update({
      where: {
        id
      },
      data: {
        status: 0
      }
    });

    if (position) {
      res.status(200).json(position);
    } else {
      return res.status(404).json({ error: "position not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete position" });
  }
}

export const getPositionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const position = await prisma.positions.findUnique({
      where: {
        id: Number(id),
        status: 1
      }
    });

    if (position) {
      res.status(200).json(position);
    } else {
      return res.status(404).json({ error: "position not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get positions" });
  }
}

// position levels
export const getPositionLevels = async (req: Request, res: Response) => {
  try {
    const positionLevel = await prisma.position_levels.findMany(
      {
        where: {
          status: 1
        }
      }
    );

    if (positionLevel) {
      res.status(200).json(positionLevel);
    } else {
      return res.status(404).json({ error: "position Levels not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get position Levels" });
  }
}

export const addPositionLevel = async (req: Request, res: Response) => {
  try {
    const { name, levelOrder } = req.body;

    if (!name || !levelOrder) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const positionLevel = await prisma.position_levels.create({
      data: {
        name,
        level_order: levelOrder,
        status: 1
      }
    });

    if (positionLevel) {
      res.status(200).json(positionLevel);
    } else {
      return res.status(404).json({ error: "position level not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to add position level" });
  }
}

export const updatePositionLevel = async (req: Request, res: Response) => {
  try {
    const { id, name, levelOrder } = req.body;

    if (!name || !levelOrder) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const position = await prisma.position_levels.update({
      where: {
        id
      },
      data: {
        name,
        level_order: levelOrder
      }
    });

    if (position) {
      res.status(200).json(position);
    } else {
      return res.status(404).json({ error: "position not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update position" });
  }
}

export const deletePositionLevel = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const positionLevel = await prisma.position_levels.update({
      where: {
        id
      },
      data: {
        status: 0
      }
    });

    if (positionLevel) {
      res.status(200).json(positionLevel);
    } else {
      return res.status(404).json({ error: "position level not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete position level" });
  }
}

export const getPositionLevelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const positionLevel = await prisma.position_levels.findUnique({
      where: {
        id: Number(id),
        status: 1
      }
    });

    if (positionLevel) {
      res.status(200).json(positionLevel);
    } else {
      return res.status(404).json({ error: "position level not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get position level" });
  }
}

// users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany(
      {
        where: {
          status: 1
        },
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          username: true,
          email: true,
          phone_no: true,
          role_id: true,
          roles: {
            select: {
              role_name: true
            }
          },
          companies: {
            select: {
              name: true
            }
          },
          departments: {
            select: {
              name: true
            }
          },
          positions: {
            select: {
              name: true
            }
          },
        },
      }
    )

    if (users) {
      res.status(200).json(users);
    } else {
      return res.status(404).json({ error: "users not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get users" });
  }
}

export const addUser = async (req: Request, res: Response) => {
  try {
    const { firstName, middleName, lastName, username, password, confirmPassword, email, phoneNo, roleId, companyId, departmentId, positionId } = req.body;

    if (!firstName || !lastName || !username || !password || !confirmPassword || !email || !phoneNo || !roleId || !companyId || !departmentId || !positionId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const existingEmail = await prisma.users.findUnique({ where: { email: email } });

    if (existingEmail) {
      return res.status(400).send("Email already exists");
    }

    const existingUsername = await prisma.users.findUnique({ where: { username: username } });

    if (existingUsername) {
      return res.status(400).send("Username already exists");
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const profileImgUrl = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`

    const user = await prisma.users.create({
      data: {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        username,
        email,
        phone_no: phoneNo,
        password: hashedPassword,
        profile_img: profileImgUrl,
        role_id: roleId,
        company_id: companyId,
        dept_id: departmentId,
        position_id: positionId,
        status: 1
      }
    });

    if (user) {
      res.status(200).json(user);
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to add user" });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, middleName, lastName, username, email, phoneNo, address, gender, roleId, companyId, departmentId, positionId } = req.body;

    if (!firstName || !lastName || !username || !email || !phoneNo || !roleId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingEmail = await prisma.users.findUnique({ where: { email: email } });

    if (existingEmail) {
      return res.status(400).send("Email already exists");
    }

    const existingUsername = await prisma.users.findUnique({ where: { username: username } });

    if (existingUsername) {
      return res.status(400).send("Username already exists");
    }

    const user = await prisma.users.update({
      where: {
        user_id: id
      },
      data: {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        username,
        email,
        phone_no: phoneNo,
        address,
        gender,
        role_id: roleId,
        company_id: companyId,
        dept_id: departmentId,
        position_id: positionId
      }
    });

    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update user" });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await prisma.users.update({
      where: {
        user_id: id
      },
      data: {
        status: 0
      }
    });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete user" });
  }
}