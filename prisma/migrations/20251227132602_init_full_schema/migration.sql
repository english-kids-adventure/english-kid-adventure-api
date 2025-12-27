-- CreateEnum
CREATE TYPE "VideoLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "MissionType" AS ENUM ('DAILY', 'WEEKLY');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatar_url" TEXT DEFAULT 'default.png',
    "total_xp" INTEGER NOT NULL DEFAULT 0,
    "total_stars" INTEGER NOT NULL DEFAULT 0,
    "current_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "streak_updated_at" DATE,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_activity_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "activity_date" DATE NOT NULL,

    CONSTRAINT "user_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_weekly_stats" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "week_start_date" DATE NOT NULL,
    "weekly_xp" INTEGER NOT NULL DEFAULT 0,
    "completed_videos_count" INTEGER NOT NULL DEFAULT 0,
    "final_rank" INTEGER,
    "reward_received" TEXT,

    CONSTRAINT "user_weekly_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "thumbnail_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "order_index" INTEGER NOT NULL DEFAULT 1,
    "level" "VideoLevel" NOT NULL,
    "url" TEXT NOT NULL,
    "duration" INTEGER,
    "unlock_cost" INTEGER NOT NULL DEFAULT 0,
    "xp_reward" INTEGER NOT NULL DEFAULT 50,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_video_progress" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "video_id" INTEGER NOT NULL,
    "is_unlocked" BOOLEAN NOT NULL DEFAULT false,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "user_video_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" SERIAL NOT NULL,
    "video_id" INTEGER NOT NULL,
    "content" TEXT,
    "media_url" TEXT,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_answers" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "content" VARCHAR(255),
    "media_url" TEXT,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_quiz_attempts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "video_id" INTEGER NOT NULL,
    "attempt_date" DATE NOT NULL,
    "times_played" INTEGER NOT NULL DEFAULT 0,
    "daily_stars_earned" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_quiz_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "missions" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "type" "MissionType" NOT NULL DEFAULT 'DAILY',
    "target_count" INTEGER NOT NULL DEFAULT 1,
    "reward_xp" INTEGER NOT NULL DEFAULT 0,
    "reward_stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "missions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_mission_progress" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "mission_id" INTEGER NOT NULL,
    "current_count" INTEGER NOT NULL DEFAULT 0,
    "is_claimed" BOOLEAN NOT NULL DEFAULT false,
    "reset_date" DATE NOT NULL,

    CONSTRAINT "user_mission_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_activity_logs_user_id_activity_date_key" ON "user_activity_logs"("user_id", "activity_date");

-- CreateIndex
CREATE INDEX "user_weekly_stats_week_start_date_weekly_xp_idx" ON "user_weekly_stats"("week_start_date", "weekly_xp");

-- CreateIndex
CREATE UNIQUE INDEX "user_weekly_stats_user_id_week_start_date_key" ON "user_weekly_stats"("user_id", "week_start_date");

-- CreateIndex
CREATE UNIQUE INDEX "topics_name_key" ON "topics"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_video_progress_user_id_video_id_key" ON "user_video_progress"("user_id", "video_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_quiz_attempts_user_id_video_id_attempt_date_key" ON "user_quiz_attempts"("user_id", "video_id", "attempt_date");

-- CreateIndex
CREATE UNIQUE INDEX "missions_code_key" ON "missions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "user_mission_progress_user_id_mission_id_reset_date_key" ON "user_mission_progress"("user_id", "mission_id", "reset_date");

-- AddForeignKey
ALTER TABLE "user_activity_logs" ADD CONSTRAINT "user_activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_weekly_stats" ADD CONSTRAINT "user_weekly_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_video_progress" ADD CONSTRAINT "user_video_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_video_progress" ADD CONSTRAINT "user_video_progress_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "quiz_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quiz_attempts" ADD CONSTRAINT "user_quiz_attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_quiz_attempts" ADD CONSTRAINT "user_quiz_attempts_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_mission_progress" ADD CONSTRAINT "user_mission_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_mission_progress" ADD CONSTRAINT "user_mission_progress_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "missions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
