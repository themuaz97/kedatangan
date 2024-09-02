import { Request, Response } from "express";
import prisma from "../db/prisma.js";

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
    } else {
      return res.status(404).json({ error: "Role not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to add role" });
  }
}

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body;

    const role = await prisma.roles.update({
      where: {
        id
      },
      data: {
        role_name: name
      }
    });

    if (role) {
      res.status(200).json(role);
    } else {
      return res.status(404).json({ error: "Role not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update role" });
  }
}

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const role = await prisma.roles.update({
      where: {
        id
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