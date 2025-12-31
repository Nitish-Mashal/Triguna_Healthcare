app_name = "triguna_healthcare"
app_title = "Bloodtestnearme Frontend"
app_publisher = "Nitish"
app_description = "Frontend application of Triguna Healthcare "
app_email = "nitishmashal0@gmail.com"
app_license = "mit"


website_route_rules = [

    # ✅ Block Frappe system & backend routes
    {"from_route": "/printview", "to_route": "/printview"},
    {"from_route": "/print", "to_route": "/print"},
    {"from_route": "/apps", "to_route": "/apps"},
    {"from_route": "/desk", "to_route": "/desk"},
    {"from_route": "/form/<path:path>", "to_route": "/form/<path:path>"},
    {"from_route": "/view/<path:path>", "to_route": "/view/<path:path>"},
    {"from_route": "/query-report/<path:path>", "to_route": "/query-report/<path:path>"},
    {"from_route": "/module/<path:path>", "to_route": "/module/<path:path>"},
    {"from_route": "/setup-wizard", "to_route": "/setup-wizard"},
    {"from_route": "/email-view", "to_route": "/email-view"},
    {"from_route": "/downloads", "to_route": "/downloads"},
    {"from_route": "/sitemap.xml", "to_route": "/sitemap.xml"},
    {"from_route": "/robots.txt", "to_route": "/robots.txt"},
    {"from_route": "/files/<path:path>", "to_route": "/files/<path:path>"},
    {"from_route": "/backups", "to_route": "/backups"},
    {"from_route": "/version-info", "to_route": "/version-info"},
    {"from_route": "/event-stream", "to_route": "/event-stream"},
    {"from_route": "/webhook/<path:path>", "to_route": "/webhook/<path:path>"},
    {"from_route": "/login", "to_route": "/login"},
    {"from_route": "/logout", "to_route": "/logout"},
    {"from_route": "/change-password", "to_route": "/change-password"},
    {"from_route": "/reset-password", "to_route": "/reset-password"},
    {"from_route": "/update-password", "to_route": "/update-password"},
    {"from_route": "/insights", "to_route": "/insights"},
    {"from_route": "/insights/<path:path>", "to_route": "/insights/<path:path>"},

    # ✅ Allow Frappe system & backend routes
    {"from_route": "/app/<path:path>", "to_route": "/app/<path:path>"},
    {"from_route": "/login", "to_route": "/login"},
    {"from_route": "/api/<path:path>", "to_route": "/api/<path:path>"},
    {"from_route": "/assets/<path:path>", "to_route": "/assets/<path:path>"},

    # ✅ Vue SPA base and static routes
    {"from_route": "/", "to_route": "/"},
    {"from_route": "/full-body-health-checkups", "to_route": "/"},
    {"from_route": "/book-blood-tests", "to_route": "/"},
    {"from_route": "/CartPage", "to_route": "/"},
    {"from_route": "/qrcodedata", "to_route": "/"},
    {"from_route": "/blog", "to_route": "/"},
    {"from_route": "/blogdetails", "to_route": "/"},
    {"from_route": "/add-diagnostic-center", "to_route": "/"},
    {"from_route": "/labs-near-me", "to_route": "/"},
    {"from_route": "/terms-and-conditions", "to_route": "/"},
    {"from_route": "/contact-us", "to_route": "/"},
    {"from_route": "/about-us", "to_route": "/"},
    {"from_route": "/privacy-policy", "to_route": "/"},
    {"from_route": "/FAQs", "to_route": "/"},

    # ✅ Dynamic Vue routes (use wildcard to catch nested paths)
    {"from_route": "/book/<path:path>", "to_route": "/"},      # e.g. /book/some-package
    {"from_route": "/<path:path>", "to_route": "/"},           # fallback for dynamic pages like /some-health-package
]


# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "triguna_healthcare",
# 		"logo": "/assets/triguna_healthcare/logo.png",
# 		"title": "Bloodtestnearme Frontend",
# 		"route": "/triguna_healthcare",
# 		"has_permission": "triguna_healthcare.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/triguna_healthcare/css/triguna_healthcare.css"
# app_include_js = "/assets/triguna_healthcare/js/triguna_healthcare.js"

# include js, css files in header of web template
# web_include_css = "/assets/triguna_healthcare/css/triguna_healthcare.css"
# web_include_js = "/assets/triguna_healthcare/js/triguna_healthcare.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "triguna_healthcare/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "triguna_healthcare/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "triguna_healthcare.utils.jinja_methods",
# 	"filters": "triguna_healthcare.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "triguna_healthcare.install.before_install"
# after_install = "triguna_healthcare.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "triguna_healthcare.uninstall.before_uninstall"
# after_uninstall = "triguna_healthcare.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "triguna_healthcare.utils.before_app_install"
# after_app_install = "triguna_healthcare.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "triguna_healthcare.utils.before_app_uninstall"
# after_app_uninstall = "triguna_healthcare.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "triguna_healthcare.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"triguna_healthcare.tasks.all"
# 	],
# 	"daily": [
# 		"triguna_healthcare.tasks.daily"
# 	],
# 	"hourly": [
# 		"triguna_healthcare.tasks.hourly"
# 	],
# 	"weekly": [
# 		"triguna_healthcare.tasks.weekly"
# 	],
# 	"monthly": [
# 		"triguna_healthcare.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "triguna_healthcare.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "triguna_healthcare.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "triguna_healthcare.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["triguna_healthcare.utils.before_request"]
# after_request = ["triguna_healthcare.utils.after_request"]

# Job Events
# ----------
# before_job = ["triguna_healthcare.utils.before_job"]
# after_job = ["triguna_healthcare.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"triguna_healthcare.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

