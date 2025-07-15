import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'dist')));

const validateEmail = email => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const validateCPF = cpf => {
  if (!cpf || typeof cpf !== 'string') return false;
  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length !== 11) return false;

  return true;
};

const validateCNPJ = cnpj => {
  if (!cnpj || typeof cnpj !== 'string') return false;
  const cleanCNPJ = cnpj.replace(/\D/g, '');

  if (cleanCNPJ.length !== 14) return false;

  return true;
};

const validatePhone = phone => {
  if (!phone || typeof phone !== 'string') return false;
  const cleanPhone = phone.replace(/\D/g, '');

  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

const validateDate = date => {
  if (!date || typeof date !== 'string') return false;
  const dateObj = new Date(date);

  return !isNaN(dateObj.getTime()) && dateObj <= new Date();
};

const validatePassword = password => {
  if (!password || typeof password !== 'string') return false;

  if (password.length < 8) return false;

  if (!/[A-Z]/.test(password)) return false;

  if (!/[a-z]/.test(password)) return false;

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

  return true;
};

const validateRegistrationData = data => {
  const errors = [];
  const warnings = [];

  if (!validateEmail(data.email)) {
    errors.push('Email deve ter um formato válido (exemplo@dominio.com)');
  }

  if (!data.userType || !['fisica', 'juridica'].includes(data.userType)) {
    errors.push('Tipo de usuário deve ser "fisica" ou "juridica"');
  }

  if (!validatePassword(data.password)) {
    errors.push(
      'Senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e caractere especial'
    );
  }

  if (!validatePhone(data.phone)) {
    errors.push('Telefone deve ter um formato válido (DDD + número)');
  }

  if (data.userType === 'fisica') {
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    }

    if (!validateCPF(data.cpf)) {
      errors.push('CPF deve ter um formato válido (11 dígitos)');
    }

    if (!validateDate(data.birthDate)) {
      errors.push(
        'Data de nascimento deve ser uma data válida e não pode ser no futuro'
      );
    } else {
      const birthDate = new Date(data.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        warnings.push('Usuário menor de 18 anos');
      }
    }
  } else if (data.userType === 'juridica') {
    if (!data.companyName || data.companyName.trim().length < 2) {
      errors.push('Razão social deve ter pelo menos 2 caracteres');
    }

    if (!validateCNPJ(data.cnpj)) {
      errors.push('CNPJ deve ter um formato válido (14 dígitos)');
    }

    if (!validateDate(data.establishmentDate)) {
      errors.push(
        'Data de abertura deve ser uma data válida e não pode ser no futuro'
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    data: {
      ...data,
      email: data.email?.trim(),
      name: data.name?.trim(),
      companyName: data.companyName?.trim(),
      cpf: data.cpf?.replace(/\D/g, ''),
      cnpj: data.cnpj?.replace(/\D/g, ''),
      phone: data.phone?.replace(/\D/g, ''),
    },
  };
};

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.post('/registration', (req, res) => {
  console.log('📝 Dados recebidos:', req.body);

  const validation = validateRegistrationData(req.body);

  if (!validation.isValid) {
    console.log('Dados inválidos:', validation.errors);
    return res.status(400).json({
      success: false,
      message: 'Dados de cadastro inválidos',
      errors: validation.errors,
      warnings: validation.warnings,
    });
  }

  if (validation.warnings.length > 0) {
    console.log('Avisos:', validation.warnings);
  }

  console.log('Dados validados com sucesso!');
  console.log('Simulando salvamento no banco de dados...');

  setTimeout(() => {
    res.status(201).json({
      success: true,
      message: 'Cadastro realizado com sucesso!',
      warnings: validation.warnings,
      data: {
        id: Math.floor(Math.random() * 10000),
        email: validation.data.email,
        userType: validation.data.userType,
        name: validation.data.name || validation.data.companyName,
        documento: validation.data.cpf || validation.data.cnpj,
        phone: validation.data.phone,
        criadoEm: new Date().toISOString(),
      },
    });
  }, 500);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'MB Web Registration API',
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    availableRoutes: [
      'GET /registration - Página de cadastro',
      'POST /registration - API de cadastro',
      'GET /health - Status da API',
    ],
  });
});

app.use((error, req, res, next) => {
  console.error('❌ Erro interno:', error);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
  });
});

app.listen(PORT, () => {
  console.log(`Desafio MB Web - Lucas Langeloh`);
  console.log(`Servidor instanciado em http://localhost:${PORT}`);
  console.log(`Health check em: http://localhost:${PORT}/health`);
});
