# Docker starter kit

## How works Docker

- **Image Docker**: Une image Docker est un modèle immuable qui contient le code source, les bibliothèques, les dépendances, les outils et autres fichiers nécessaires pour exécuter une application. Les images servent de point de départ pour créer des conteneurs. Pour décrire une image, on utilise un fichier Dockerfile qui spécifie comment construire l'image. Par exemple, pour une image basée sur Ubuntu :

```Dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y nginx
CMD ["nginx", "-g", "daemon off;"]
```

- [**Docker Hub**](https://hub.docker.com) : Docker Hub est un service de registre qui permet de trouver, partager et gérer des images Docker. Les utilisateurs peuvent pousser leurs images sur Docker Hub pour les rendre accessibles à d'autres, ou télécharger des images publiques pour leur propre utilisation. Docker Hub contient une vaste bibliothèque d'images officielles et communautaires.
On peut reconnaitre les [images officielles](https://hub.docker.com/search?image_filter=official) par leur nom d'utilisateur `library`, par exemple `library/ubuntu` ou encore par le "_" dans l'url d'une image, par exemple `/_/ubuntu`.
Ne vous laissez pas berner par des images communautaires qui pourraient contenir des logiciels malveillants.
 
- **Conteneur** : Un conteneur est une instance exécutable d'une image Docker. Il encapsule l'application et son environnement d'exécution. Plusieurs conteneurs peuvent être lancés à partir de la même image, fonctionnant isolément les uns des autres. Les conteneurs partagent le même noyau de système d'exploitation mais peuvent être limités en termes de CPU, mémoire, et autres ressources.

- **Volume** : Un volume est un mécanisme pour persister et partager des données entre conteneurs et le système hôte. Contrairement aux données dans les couches d'une image Docker, les données dans un volume ne sont pas supprimées lorsque le conteneur est détruit. Les volumes sont utiles pour la sauvegarde, la restauration et le partage de données.  

- **Network** : Docker utilise des réseaux pour permettre la communication entre les conteneurs. Par défaut, Docker fournit plusieurs réseaux (bridge, host, none, etc.), mais les utilisateurs peuvent également créer leurs propres réseaux. Cela permet de contrôler la manière dont les conteneurs communiquent entre eux et avec l'extérieur.

Exemple de création et gestion d'un conteneur, volume, et réseau :

```shell
# Télécharger une image Ubuntu depuis Docker Hub
docker pull ubuntu:20.04

# Créer et démarrer un conteneur à partir de l'image Ubuntu
docker run -d --name mon-ubuntu ubuntu:20.04

# Créer un volume pour persister des données
docker volume create mon-volume

# Attacher le volume au conteneur pour persister des données
docker run -d --name mon-ubuntu-avec-volume -v mon-volume:/data ubuntu:20.04

# Créer un réseau personnalisé
docker network create mon-reseau

# Connecter le conteneur au réseau personnalisé
docker network connect mon-reseau mon-ubuntu
```

- Generated with GitHub Copilot
