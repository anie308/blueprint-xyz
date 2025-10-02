Backend Development Guide for Blueprint-XYZ
   * Language: Node.js (with TypeScript) or Python
  2. Database Models (Schema Definition)
  2.1. User Model
  Represents a user of the platform.
  *   id: UUID (Primary Key)
  *   username: String (Unique)
  *   email: String (Unique, Hashed)
  *   passwordHash: String
  *   profilePictureUrl: String (URL to cloud storage)
  *   bio: Text (Optional)
  *   location: String (Optional)
  *   website: String (Optional)
  *   socialLinks: JSON/Array of Strings (e.g., LinkedIn, Instagram)
  *   subscriptionTier: Enum ('free', 'pro', 'premium') - inferred from subscription-limit-banner.tsx
  *   createdAt: DateTime
  *   updatedAt: DateTime
     Relationships:*
      *   One-to-many with Project (as author)
      *   One-to-many with Post (as author)
      *   One-to-many with Reel (as author)
      *   Many-to-many with Studio (as member)
      *   Many-to-many with Conversation
      *   One-to-many with Notification (as recipient)
      *   One-to-many with SavedItem


  2.2. Studio Model
  Represents a creative studio or company.
  *   id: UUID (Primary Key)
  *   name: String (Unique)
  *   slug: String (Unique, URL-friendly name)
  *   logoUrl: String (URL to cloud storage)
  *   description: Text
  *   location: String
  *   website: String (Optional)
  *   ownerId: UUID (Foreign Key to User)
  *   createdAt: DateTime
  *   updatedAt: DateTime
     Relationships:*
      *   One-to-many with User (as owner)
      *   Many-to-many with User (as members)
      *   One-to-many with Job (posted by studio)
      *   One-to-many with Project (created by studio)


  2.3. Project Model
  Represents a creative project.
  *   id: UUID (Primary Key)
  *   title: String
  *   slug: String (Unique, URL-friendly name)
  *   description: Text
  *   coverImageUrl: String (URL to cloud storage)
  *   mediaUrls: Array of Strings (URLs to cloud storage for additional images/videos)
  *   authorId: UUID (Foreign Key to User or Studio)
  *   authorType: Enum ('User', 'Studio') - for polymorphic relationship
  *   tags: Array of Strings
  *   likesCount: Integer (Default 0)
  *   commentsCount: Integer (Default 0)
  *   viewsCount: Integer (Default 0)
  *   createdAt: DateTime
  *   updatedAt: DateTime
     Relationships:*
      *   Many-to-one with User or Studio (as author)
      *   One-to-many with Comment
      *   One-to-many with Like
      *   Many-to-many with SavedItem

  2.4. Post Model
  Represents a general feed post (text, image, short video).
  *   id: UUID (Primary Key)
  *   content: Text
  *   mediaUrl: String (URL to cloud storage, Optional)
  *   authorId: UUID (Foreign Key to User)
  *   likesCount: Integer (Default 0)
  *   commentsCount: Integer (Default 0)
  *   createdAt: DateTime
  *   updatedAt: DateTime
     Relationships:*
      *   Many-to-one with User (as author)
      *   One-to-many with Comment
      *   One-to-many with Like
      *   Many-to-many with SavedItem


  2.5. Reel Model
  Represents short-form video content. Similar to Post but video-focused.
  *   id: UUID (Primary Key)
  *   title: String (Optional)
  *   videoUrl: String (URL to cloud storage)
  *   thumbnailUrl: String (URL to cloud storage)
  *   description: Text (Optional)
  *   authorId: UUID (Foreign Key to User)
  *   likesCount: Integer (Default 0)
  *   commentsCount: Integer (Default 0)
  *   viewsCount: Integer (Default 0)
  *   createdAt: DateTime
  *   updatedAt: DateTime
     Relationships:*
      *   Many-to-one with User (as author)
      *   One-to-many with Comment
      *   One-to-many with Like
      *   Many-to-many with SavedItem


  2.6. Job Model
  Represents a job posting.
  *   id: UUID (Primary Key)
  *   title: String
  *   description: Text
  *   location: String
  *   salaryRange: String (e.g., "50k-70k", "Negotiable")
  *   jobType: Enum ('full-time', 'part-time', 'contract', 'freelance')
  *   postedById: UUID (Foreign Key to User or Studio)
  *   postedByType: Enum ('User', 'Studio')
  *   applicationLink: String (Optional)
  *   expiresAt: DateTime (Optional)
  *   createdAt: DateTime
  *   updatedAt: DateTime
     Relationships:*
      *   Many-to-one with User or Studio (as poster)
      *   Many-to-many with SavedItem


  2.7. Conversation Model
  Represents a private message conversation between users.
  *   id: UUID (Primary Key)
  *   lastMessageId: UUID (Foreign Key to Message, Optional)
  *   createdAt: DateTime
  *   updatedAt: DateTime
     Relationships:*
      *   Many-to-many with User (participants)
      *   One-to-many with Message


  2.8. Message Model
  Represents a single message within a conversation.
  *   id: UUID (Primary Key)
  *   conversationId: UUID (Foreign Key to Conversation)
  *   senderId: UUID (Foreign Key to User)
  *   content: Text
  *   readBy: Array of UUIDs (Users who have read the message)
  *   sentAt: DateTime
     Relationships:*
      *   Many-to-one with Conversation
      *   Many-to-one with User (as sender)


  2.9. Notification Model
  Represents a notification for a user.
  *   id: UUID (Primary Key)
  *   recipientId: UUID (Foreign Key to User)
  *   type: Enum ('like', 'comment', 'follow', 'message', 'job_alert', etc.)
  *   sourceId: UUID (ID of the related entity, e.g., projectId, postId, userId)
  *   sourceType: Enum ('Project', 'Post', 'User', etc.)
  *   message: Text (e.g., "John liked your project")
  *   isRead: Boolean (Default false)
  *   createdAt: DateTime
     Relationships:*
      *   Many-to-one with User (as recipient)


  2.10. Comment Model
  Represents a comment on a project, post, or reel.
  *   id: UUID (Primary Key)
  *   content: Text
  *   authorId: UUID (Foreign Key to User)
  *   parentId: UUID (Foreign Key to Comment, for nested comments, Optional)
  *   entityId: UUID (ID of the commented entity, e.g., projectId, postId, reelId)
  *   entityType: Enum ('Project', 'Post', 'Reel')
  *   createdAt: DateTime
  *   updatedAt: DateTime
     Relationships:*
      *   Many-to-one with User (as author)
      *   Many-to-one with Project, Post, or Reel


  2.11. Like Model
  Represents a like on a project, post, or reel.
  *   id: UUID (Primary Key)
  *   userId: UUID (Foreign Key to User)
  *   entityId: UUID (ID of the liked entity, e.g., projectId, postId, reelId)
  *   entityType: Enum ('Project', 'Post', 'Reel')
  *   createdAt: DateTime
     Relationships:*
      *   Many-to-one with User
      *   Many-to-one with Project, Post, or Reel


  2.12. SavedItem Model
  Represents an item saved by a user.
  *   id: UUID (Primary Key)
  *   userId: UUID (Foreign Key to User)
  *   entityId: UUID (ID of the saved entity, e.g., projectId, postId, jobId)
  *   entityType: Enum ('Project', 'Post', 'Reel', 'Job')
  *   createdAt: DateTime
     Relationships:*
      *   Many-to-one with User

  ---

  #### 3. API Endpoints


  Here's a proposed RESTful API structure, mapping to the frontend routes and functionalities.


  3.1. Authentication & User Management (`/api/auth`, `/api/users`)
  *   POST /api/auth/register: Register a new user.
  *   POST /api/auth/login: Authenticate user, return JWT.
  *   POST /api/auth/logout: Invalidate JWT (optional, can be handled client-side).
  *   GET /api/auth/me: Get current authenticated user's profile.
  *   GET /api/users/:username: Get public profile of a user.
  *   PUT /api/users/me: Update current authenticated user's profile.
  *   PATCH /api/users/me/profile-picture: Upload/update profile picture.


  3.2. Projects (`/api/projects`)
  *   GET /api/projects: Get a list of projects (with pagination, filtering, sorting).
  *   POST /api/projects: Create a new project.
  *   GET /api/projects/:id: Get details of a specific project.
  *   PUT /api/projects/:id: Update a specific project (requires ownership).
  *   DELETE /api/projects/:id: Delete a specific project (requires ownership).
  *   POST /api/projects/:id/like: Like a project.
  *   DELETE /api/projects/:id/like: Unlike a project.
  *   GET /api/projects/:id/comments: Get comments for a project.
  *   POST /api/projects/:id/comments: Add a comment to a project.


  3.3. Studios (`/api/studios`)
  *   GET /api/studios: Get a list of studios.
  *   POST /api/studios: Create a new studio.
  *   GET /api/studios/:id: Get details of a specific studio.
  *   PUT /api/studios/:id: Update a specific studio (requires ownership).
  *   DELETE /api/studios/:id: Delete a specific studio (requires ownership).
  *   GET /api/studios/:id/members: Get members of a studio.
  *   POST /api/studios/:id/members: Add a member to a studio.
  *   DELETE /api/studios/:id/members/:userId: Remove a member from a studio.
  *   GET /api/studios/:id/jobs: Get jobs posted by a studio.
  *   GET /api/studios/:id/projects: Get projects by a studio.


  3.4. Jobs (`/api/jobs`)
  *   GET /api/jobs: Get a list of job postings.
  *   POST /api/jobs: Create a new job posting.
  *   GET /api/jobs/:id: Get details of a specific job posting.
  *   PUT /api/jobs/:id: Update a specific job posting (requires ownership).
  *   DELETE /api/jobs/:id: Delete a specific job posting (requires ownership).


  3.5. Posts (`/api/posts`)
  *   GET /api/posts: Get a list of posts (e.g., for a feed).
  *   POST /api/posts: Create a new post.
  *   GET /api/posts/:id: Get details of a specific post.
  *   PUT /api/posts/:id: Update a specific post (requires ownership).
  *   DELETE /api/posts/:id: Delete a specific post (requires ownership).
  *   POST /api/posts/:id/like: Like a post.
  *   DELETE /api/posts/:id/like: Unlike a post.
  *   GET /api/posts/:id/comments: Get comments for a post.
  *   POST /api/posts/:id/comments: Add a comment to a post.


  3.6. Reels (`/api/reels`)
  *   GET /api/reels: Get a list of reels.
  *   POST /api/reels: Create a new reel.
  *   GET /api/reels/:id: Get details of a specific reel.
  *   PUT /api/reels/:id: Update a specific reel (requires ownership).
  *   DELETE /api/reels/:id: Delete a specific reel (requires ownership).
  *   POST /api/reels/:id/like: Like a reel.
  *   DELETE /api/reels/:id/like: Unlike a reel.
  *   GET /api/reels/:id/comments: Get comments for a reel.
  *   POST /api/reels/:id/comments: Add a comment to a reel.


  3.7. Messaging (`/api/messages`)
  *   GET /api/messages/conversations: Get a list of user's conversations.
  *   GET /api/messages/conversations/:conversationId: Get messages within a specific conversation.
  *   POST /api/messages/conversations/:userId: Start a new conversation or send a message to a user.
  *   POST /api/messages/:conversationId: Send a message to an existing conversation.
  *   PATCH /api/messages/:messageId/read: Mark a message as read.


  3.8. Notifications (`/api/notifications`)
  *   GET /api/notifications: Get a list of user's notifications.
  *   PATCH /api/notifications/:id/read: Mark a specific notification as read.
  *   PATCH /api/notifications/read-all: Mark all notifications as read.


  3.9. Saved Items (`/api/saved`)
  *   GET /api/saved: Get a list of items saved by the user.
  *   POST /api/saved: Save an item (e.g., body: { entityId: '...', entityType: 'Project' }).
  *   DELETE /api/saved/:entityId/:entityType: Unsave an item.


  3.10. Feed & Trending (`/api/feed`, `/api/trending`)
  *   GET /api/feed: Get personalized feed content (mix of posts, projects, reels from followed users/studios).
  *   GET /api/trending: Get trending content (posts, projects, reels based on engagement).

  ---

  #### 4. Backend Structure & Best Practices


   * Modular Design: Organize code into modules (e.g., auth, users, projects, jobs) with clear separation of concerns (controllers, services, repositories/DAOs).
  This guide provides a solid foundation for building the backend server. The specific implementation details will depend on the chosen framework and libraries.
