# Generated by Django 4.1.13 on 2024-03-25 22:37

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("script_synergy", "0002_curator_writer_delete_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="curator",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 25, 22, 37, 26, 332531, tzinfo=datetime.timezone.utc
                )
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="curator",
            name="updated_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 25, 22, 37, 32, 536109, tzinfo=datetime.timezone.utc
                )
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="writer",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 25, 22, 37, 39, 386861, tzinfo=datetime.timezone.utc
                )
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="writer",
            name="updated_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 3, 25, 22, 37, 45, 461320, tzinfo=datetime.timezone.utc
                )
            ),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name="WriterDocuments",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField()),
                ("updated_at", models.DateTimeField()),
                ("file_name", models.CharField(max_length=255)),
                (
                    "_document_type",
                    models.SmallIntegerField(choices=[(0, "Plain Text"), (1, "PDF")]),
                ),
                (
                    "writer",
                    models.ForeignKey(
                        db_constraint=False,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="writer_documents",
                        to="script_synergy.writer",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
