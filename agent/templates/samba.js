// Pasta de rede (Samba/SMB): aparece no Windows como uma unidade (\\IP\Arquivos), para guardar arquivos e copias de seguranca
module.exports = {
  id: "samba", order: 60, name: "Pasta de rede (Samba)", category: "outros", icon: "folder",
  description: "Uma pasta desta máquina que aparece no Windows como unidade de rede (\\\\IP\\Arquivos): guarde arquivos e cópias de segurança. Os arquivos ficam na pasta do servidor.",
  image: "ghcr.io/servercontainers/samba:latest", install: null,
  startup: "", mount: "/shares/arquivos", user: "root", chown: "1000:1000",
  stop: "SIGTERM", done: null,
  ports: [{ name: "Rede (SMB)", container: 445, protocol: "tcp", default: 445 }],
  limits: { memory: 512, cpu: 1, disk: 0 },
  env: {
    UID_piphin: "1000",
    WSDD2_DISABLE: "1",
    AVAHI_DISABLE: "1",
    NETBIOS_DISABLE: "1",
    SAMBA_VOLUME_CONFIG_arquivos:
      "[Arquivos]; path=/shares/arquivos; available = yes; browsable = yes; writable = yes; read only = no; valid users = piphin; force user = piphin; guest ok = no",
  },
  envFromVars: { ACCOUNT_piphin: "PASSWORD" },
  vars: [
    { key: "PASSWORD", name: "Senha (usuário piphin)", description: "No Windows, entre com o usuário piphin e esta senha.", type: "password", default: "", required: true, minLength: 6 },
  ],
  notes: "No Windows: Explorador de Arquivos > Este Computador > Mapear unidade de rede, pasta \\\\IP-DA-MÁQUINA\\Arquivos, usuário piphin e a senha escolhida. A porta 445 é a do Windows (não mude).",
};
