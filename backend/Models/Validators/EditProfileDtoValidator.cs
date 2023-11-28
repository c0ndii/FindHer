using FluentValidation;
namespace Find_H_er.Models.Validators
{
    public class EditProfileDtoValidator : AbstractValidator<EditProfileDto>
    {
        public EditProfileDtoValidator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(20)
                .NotEmpty();
            RuleFor(x => x.Description)
                .NotEmpty()
                .MaximumLength(100);
            RuleFor(x => x.Age)
                .InclusiveBetween(18, 100)
                .NotEmpty();
            RuleFor(x => x.Sex)
                .NotEmpty();
            RuleFor(x => x.Image)
                .NotEmpty();
        }
    }
}
