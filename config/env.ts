/**
 * Entornos soportados por el framework.
 */
export type TestEnv = "local" | "dev" | "stage";

/**
 * Aplicaciones bajo prueba.
 */
export type AppName = "saucedemo" | "loan";

/**
 * Contrato de configuración global para ejecución de pruebas.
 */
export interface RuntimeConfig {
  /** Entorno activo. */
  env: TestEnv;
  /** Aplicación activa. */
  app: AppName;
  /** URL base efectiva para navegación. */
  baseURL: string;
  /** Loan id por defecto para pruebas loan. */
  defaultLoanId: string;
}

/**
 * Variables de ejecución con defaults seguros para entrenamiento.
 */
const env = (process.env.TEST_ENV ?? "local") as TestEnv;
const app = (process.env.TEST_APP ?? "saucedemo") as AppName;

/**
 * URLs por aplicación y entorno.
 * TODO: reemplazar URLs corporativas reales para loan en dev/stage.
 */
const baseUrls: Record<AppName, Record<TestEnv, string>> = {
  saucedemo: {
    local: "https://www.saucedemo.com/",
    dev: "https://www.saucedemo.com/",
    stage: "https://www.saucedemo.com/",
  },
  loan: {
    local: "http://127.0.0.1:3000",
    dev: "https://TU-URL-REAL-LOAN-DEV",
    stage: "https://TU-URL-REAL-LOAN-STAGE",
  },
};

/**
 * Datos por entorno para módulo loan.
 */
const defaultLoanIds: Record<TestEnv, string> = {
  local: "LN-1001",
  dev: "LN-1001",
  stage: "STG-LN-9001",
};

/**
 * Config final consumida por fixtures/tests.
 * BASE_URL sobreescribe si se define por variable de entorno.
 */
export const runtimeConfig: RuntimeConfig = {
  env,
  app,
  baseURL: process.env.BASE_URL ?? baseUrls[app][env],
  defaultLoanId: defaultLoanIds[env],
};