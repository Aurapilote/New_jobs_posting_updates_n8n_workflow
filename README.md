# 🕵️‍♂️ AI Job Monitor (n8n + Gemini + Supabase)

Un outil d'automatisation intelligent qui surveille les pages carrières des startups et notifie en temps réel sur Slack lors de la publication de nouvelles offres.

## 🚀 Pourquoi ce projet ?
Mon but est de suivre en temps réel les offres d'entreprises qui ne sont pas forcement publiées tout de suite sur linkedin dans la rubrique offre et me permet surtout de savoir quelles offres sont nouvellement publiées sur une liste spécifique d'entreprises targetées

## ⚙️ Architecture Technique

Le workflow est orchestré sur **n8n** et suit cette logique :

1.  **Schedule** : Lancement automatique quotidien.
2.  **Database (Supabase)** : Récupération de la liste des startups à surveiller.
3.  **Scraping (HTTP Request)** : Récupération du HTML brut des pages carrières.
4.  **Extraction AI (Google Gemini)** : Analyse du HTML pour extraire des objets structurés `{'title', 'location'}`.
5.  **Comparaison Intelligente (JavaScript)** :
    * Comparaison *Current State* vs *Previous State*.
    * Détection des doublons via couple (Titre + Ville).
6.  **Notification (Slack)** : Envoi d'une alerte précise uniquement si une différence est détectée.
7.  **Mise à jour (Supabase)** : Sauvegarde du nouvel état.

## 🛠 Stack Technique

* **Orchestration** : [n8n](https://n8n.io/)
* **Database** : Supabase (PostgreSQL / JSONB)
* **AI Model** : Google Gemini 2.5 Flash (via API)
* **Notification** : Slack Webhook
* **Language** : JavaScript (pour la logique de filtrage)

## 📦 Comment utiliser ce workflow

1.  Téléchargez le fichier `job-scraper-workflow.json`.
2.  Importez-le dans votre instance n8n.
3.  Configurez vos Credentials (Supabase, Google Gemini, Slack).
4.  Créez la table `startups` dans Supabase avec les colonnes : `id`, `name`, `career_url`, `current_jobs` (JSONB).

---
