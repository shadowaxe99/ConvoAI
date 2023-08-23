import os


def load_email_template(template_name):
    template_path = os.path.join('email_templates', f'{template_name}.html')
    with open(template_path, 'r') as template_file:
        template_content = template_file.read()
    return template_content


def render_email_template(template_content, **kwargs):
    rendered_template = template_content
    for key, value in kwargs.items():
        placeholder = f'{{{{ {key} }}}}'
        rendered_template = rendered_template.replace(placeholder, str(value))
    return rendered_template