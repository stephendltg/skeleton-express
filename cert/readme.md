GENERATE SSL
---

# GENERER CERTIFICAT

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

## Details de la commande

openssl : il s'agit de l'outil de ligne de commande de base pour créer et gérer des certificats OpenSSL, des clés et d'autres fichiers.

req : Cette sous-commande spécifie que nous voulons utiliser la gestion des demandes de signature de certificat (CSR) X.509. Le «X.509» est une norme d'infrastructure à clé publique à laquelle SSL et TLS adhèrent pour sa gestion des clés et des certificats. Nous voulons créer un nouveau certificat X.509, nous utilisons donc cette sous-commande.

-x509 : cela modifie encore la sous-commande précédente en indiquant à l'utilitaire que nous voulons créer un certificat auto-signé au lieu de générer une demande de signature de certificat, comme cela se produirait normalement.

-nodes : Cela indique à OpenSSL d'ignorer l'option pour sécuriser notre certificat avec une phrase secrète. Nous avons besoin de Nginx pour pouvoir lire le fichier, sans intervention de l'utilisateur, au démarrage du serveur. Une phrase secrète empêcherait cela de se produire car nous devions la saisir après chaque redémarrage.

-days 365 : cette option définit la durée pendant laquelle le certificat sera considéré comme valide. Nous le fixons pour un an ici.

-newkey rsa: 2048 : Ceci spécifie que nous voulons générer un nouveau certificat et une nouvelle clé en même temps. Nous n'avons pas créé la clé requise pour signer le certificat à une étape précédente, nous devons donc le créer avec le certificat. La rsa:2048partie lui dit de créer une clé RSA de 2048 bits.

-keyout : cette ligne indique à OpenSSL où placer le fichier de clé privée généré que nous créons.

-out : Cela indique à OpenSSL où placer le certificat que nous créons.

# INVITE DE SAISI AVEC LA COMMANDE

Nom du pays (code à 2 lettres) [AU]:
Nom de l'État ou de la province des États - Unis (nom complet) [Quel État]:
Nom de la localité de New York (par exemple, ville) []:
Nom de l'organisation de la ville de New York (par exemple, société) [Internet Widgits Pty Ltd]: Bouncy Castles, Inc.
Nom de l'unité organisationnelle (par exemple, une section) []:
Nom commun du ministère des Glissades d'eau (par exemple, le nom de domaine complet du serveur ou VOTRE nom) []: votre_adresse_mail.com
[]: admin @ votre_domaine. com
