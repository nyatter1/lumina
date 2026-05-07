# Security Specification for Lumina

## 1. Data Invariants
- A user can only edit their own profile.
- A project can only be created by an authenticated and verified user.
- A project is only visible to its owner and collaborators, unless it is marked as public.
- Chapters and comments must belong to a valid project.
- Access to chapters is inherited from project membership/visibility.
- Only owners and editors can modify project details or chapters.
- Viewers can only read and comment.
- Owners cannot be removed from their own projects.

## 2. The "Dirty Dozen" Payloads (Anti-Patterns)
1. **Identity Spoofing**: Attempt to create a project where `ownerId` is someone else.
2. **Unauthorized Metadata Update**: Attempt to change project `ownerId` after creation.
3. **Ghost Field Injection**: Attempt to add `isAdmin: true` to a user profile.
4. **Privilege Escalation**: A viewer attempting to edit chapter content.
5. **Relational Sync Bypass**: Attempting to create a chapter with a `projectId` that doesn't exist.
6. **Orphaned Writes**: Attempting to delete a project without deleting its sub-chapters.
7. **Junk Character Poisoning**: Using a 2KB string as a `projectId`.
8. **Resource Exhaustion**: Sending a 10MB chapter content string (well, 1MB limit check).
9. **Timestamp Spoofing**: Sending a `createdAt` in the future.
10. **Membership Revocation bypass**: A removed member attempting to still read project chapters.
11. **Shadow Update**: Attempting to update a chapter's `order` while also sneaking in a `content` change when only supposed to rearrange.
12. **PII Leak**: An unauthorized user attempting to read another user's email via a blanket collection read.

## 3. Test Runner Concept
The tests will verify that:
- `create` with spoofed `ownerId` fails.
- `update` on `ownerId` fails.
- `list` on projects only returns allowed projects.
- `get` on a private project by a non-member fails.
